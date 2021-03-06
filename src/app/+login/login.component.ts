import { Component, Input, Output, NgZone } from '@angular/core';
import { ROUTER_DIRECTIVES, Router, ActivatedRoute } from '@angular/router';
import { Http, Response, HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import {  ControlGroup, FormBuilder, Control } from '@angular/common';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Md5 } from 'ts-md5/dist/md5';
import { UserApi, CommonApi, ShopApi, UserResponse, LoginReq } from 'client';
import { Cookie } from 'services';

@Component({
  selector: 'login',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: require('./login.html'),
  styles: [require('./login.scss')],
  providers: [HTTP_PROVIDERS, UserApi, CommonApi, ShopApi, Md5, Cookie]
})
export class Login {
  loginForm: ControlGroup;
  zone: any;
  user: LoginReq = { phone: '', rnd: '', pwd: '' };
  seekDisabeld: number = 0;
  seekBtnTitle: number = 0;
  img: any;
  errorMsg: any;
  loading: number = 0;
  openProtocol: number = 0;
  openErrorProtocol: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private uApi: UserApi, private cApi: CommonApi, private sApi: ShopApi) {
    this.zone = new NgZone({ enableLongStackTrace: false }); // 事务控制器
  }

  blur(data, e) {
    data.blur = e.type == 'blur';
  }

  errorWin(message) {
    if (message === '短信验证码超时，导致userId不存在' || message === '您今天的短信发送已达到3次上限') {
      this.openErrorProtocol = true;
    } else {
      this.errorMsg = message;
    }
    this.getCodeImg();
  }

  // 初始化
  ngOnInit() {
    this.getCodeImg();
  }

  onInitError(){
    this.errorMsg = null;
  }

  /**
   * 获取图片验证码
   * @return {[type]} [description]
   */
  getCodeImg() {
    this.cApi.commonCaptchaBase64Post().subscribe((data: Response) => {
      this.img = 'data:image/jpeg;base64,' + (data.text() || '');
      this.uApi.defaultHeaders.set('uuid', data.headers.get('uuid'));
    });
  }
  onChangeCodeImg() {
    this.getCodeImg();
  }
  errorTip(f){
    if(f.controls.phone.errors&&f.controls.phone.errors.required){
        this.errorMsg = '手机号码不能为空';
        return true;
    }
    if(f.controls.phone.errors&&f.controls.phone.errors.pattern){
        this.errorMsg = '请输入正确的手机号码';
        return true;
    }
    if(f.controls.pwd.errors&&f.controls.pwd.errors.required){
        this.errorMsg = '账户密码不能为空';
        return true;
    }
    if(f.controls.rnd.errors&&f.controls.rnd.errors.required){
        this.errorMsg = '验证码不能为空';
        return true;
    }
    this.errorMsg = null;
    return false;
  }
  // 登录
  onLogin(f) {
    if(this.errorTip(f)){
        return false;
    }
    this.loading = 1;
    let params = this.user;
    // mobile: string, password: string, code: string,
    this.uApi.userLoginPost(params.phone, Md5.hashStr(params.pwd, false).toString(), params.rnd)
      .subscribe((data) => {
        this.loading = 0;
        if (data.meta.code === 200) {
          Cookie.save('token', data.data.User.token, 7);
          Cookie.save('shopId', data.data.User.lastShopId);
          this.sApi.defaultHeaders.set('token', data.data.User.token);
          if (data.data.User.lastShopId === null) {
            this.router.navigate(['/init-store']);
          } else {
            this.sApi.defaultHeaders.set('shopId', data.data.User.lastShopId);
            this.router.navigate(['/dashboard/business/list']);
          }
        } else {
          this.errorMsg = data.error.message;
        }
      });
  }

  toHome() {
    this.router.navigate(['']);
  }
  goBack() {
    window.history.back();
  }
}
