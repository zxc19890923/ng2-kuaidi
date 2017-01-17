import { Component } from "@angular/core";
import {HttpJsonServer} from "./http-jsonp.server";
import {Http, URLSearchParams} from "@angular/http";
import "rxjs/add/operator/map";
@Component({
  selector: "me",
  templateUrl: "./templates/me.component.html"
})
export class MeComponent {
  result: Array<Object>;
  data: Array<Object>;
  name: string;
  number: string;
  message: string;

  constructor(public http: Http, public httpJsonServer: HttpJsonServer) {
    this.name = "zhongtong";
    this.message = "";
    // this.number = "";
    httpJsonServer.httpGet("./kuaidi.json", "").subscribe(res=>{
      console.log(res);
      this.data = res;
    });
  }
  searchKd() {
    if(this.number == "" || this.number==undefined) {
      this.message = "快递单号不能为空";
    }
    else {
      //  调用外部接口, 获取快递信息
      var url = "http://api.kuaidi.com/openapi.html";
      var id = "48a3bd2bd6d472601bb36f7705fe19f0";
      var params = new URLSearchParams();
      // params.set("callback", "JSONP_CALLBACK");
      params.set("id", id);
      params.set("com", this.name);
      params.set("nu", this.number.toString());
      this.httpJsonServer.httpGet(url, params).subscribe(res=> {
        console.log(res);
        if (res.success == true) {
          this.result = res.data;
          this.message = "";
        }
      }, err=>{ // 处理错误信息
        console.log(err);
        console.log(err.status);
        this.message = "快递编号错误";
        this.result = [];
      })
    }
  }
}
