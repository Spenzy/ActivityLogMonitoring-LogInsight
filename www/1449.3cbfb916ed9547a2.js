"use strict";(self.webpackChunkLogInsight_ALM=self.webpackChunkLogInsight_ALM||[]).push([[1449],{1449:(v,d,l)=>{l.r(d),l.d(d,{AuthModule:()=>Z});var a=l(6895),e=l(4650),i=l(5892),c=l(3651);const g=function(){return{"background-image":"src/assets/images/auth.jpg"}};let h=(()=>{class t{constructor(o,n,u){this.router=o,this.route=n,this.authService=u}ngOnInit(){}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(i.F0),e.Y36(i.gz),e.Y36(c.e))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-login"]],decls:37,vars:2,consts:[[1,"row","w-100","mx-0","auth-page"],[1,"col-md-8","col-xl-6","mx-auto"],[1,"card"],[1,"row"],[1,"col-md-4","pe-md-0"],[1,"auth-side-wrapper",3,"ngStyle"],[1,"col-md-8","ps-md-0"],[1,"auth-form-wrapper","px-4","py-5"],["routerLink",".",1,"nobleui-logo","logo-light","d-block","mb-2"],[1,"text-muted","fw-normal","mb-4"],[1,"forms-sample"],[1,"mb-3"],["for","exampleInputEmail1",1,"form-label"],["type","email","id","exampleInputEmail1","placeholder","Email",1,"form-control",3,"required"],["userName",""],["for","exampleInputPassword1",1,"form-label"],["type","password","id","exampleInputPassword1","autocomplete","current-password","placeholder","Password",1,"form-control",3,"required"],["userPassword",""],[1,"form-check","mb-3"],["type","checkbox","id","authCheck",1,"form-check-input"],["for","authCheck",1,"form-check-label"],["type","submit",1,"btn","btn-primary","me-2","mb-2","mb-md-0",3,"click"],["type","button",1,"btn","btn-outline-primary","btn-icon-text","mb-2","mb-md-0",3,"click"],[1,"mdi","mdi-google","btn-icon-prepend"],["routerLink","/auth/register",1,"d-block","mt-3","text-muted"]],template:function(o,n){if(1&o){const u=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),e._UZ(5,"div",5),e.qZA(),e.TgZ(6,"div",6)(7,"div",7)(8,"a",8)(9,"span"),e._uU(10,"Log"),e.qZA(),e._uU(11,"Insight"),e.qZA(),e.TgZ(12,"h5",9),e._uU(13,"Welcome back! Log in to your account."),e.qZA(),e.TgZ(14,"form",10)(15,"div",11)(16,"label",12),e._uU(17,"Email address"),e.qZA(),e._UZ(18,"input",13,14),e.qZA(),e.TgZ(20,"div",11)(21,"label",15),e._uU(22,"Password"),e.qZA(),e._UZ(23,"input",16,17),e.qZA(),e.TgZ(25,"div",18),e._UZ(26,"input",19),e.TgZ(27,"label",20),e._uU(28," Remember me "),e.qZA()(),e.TgZ(29,"div")(30,"button",21),e.NdJ("click",function(){e.CHM(u);const s=e.MAs(19),p=e.MAs(24);return e.KtG(n.authService.SignIn(s.value,p.value))}),e._uU(31,"Login"),e.qZA(),e.TgZ(32,"button",22),e.NdJ("click",function(){return n.authService.GoogleAuth()}),e._UZ(33,"i",23),e._uU(34," Login with Google "),e.qZA()(),e.TgZ(35,"a",24),e._uU(36,"Not a user? Sign up"),e.qZA()()()()()()()()}2&o&&(e.xp6(5),e.Q6J("ngStyle",e.DdM(1,g)))},dependencies:[a.PC,i.yS],styles:["[_nghost-%COMP%]{height:100vh;display:flex;align-items:center;justify-content:center}"]}),t})();const b=function(){return{}},f=[{path:"",component:(()=>{class t{constructor(o,n){this.router=o,this.authService=n}ngOnInit(){this.authService.isLoggedIn&&this.router.navigate(["/dashboard"])}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(i.F0),e.Y36(c.e))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-auth"]],decls:1,vars:0,template:function(o,n){1&o&&e._UZ(0,"router-outlet")},dependencies:[i.lC],encapsulation:2}),t})(),children:[{path:"",redirectTo:"login",pathMatch:"full"},{path:"login",component:h},{path:"register",component:(()=>{class t{constructor(o,n){this.router=o,this.authService=n}ngOnInit(){}}return t.\u0275fac=function(o){return new(o||t)(e.Y36(i.F0),e.Y36(c.e))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-register"]],decls:42,vars:2,consts:[[1,"row","w-100","mx-0","auth-page"],[1,"col-md-8","col-xl-6","mx-auto"],[1,"card"],[1,"row"],[1,"col-md-4","pe-md-0"],[1,"auth-side-wrapper",3,"ngStyle"],[1,"col-md-8","ps-md-0"],[1,"auth-form-wrapper","px-4","py-5"],["routerLink",".",1,"nobleui-logo","logo-light","d-block","mb-2"],[1,"text-muted","fw-normal","mb-4"],[1,"forms-sample"],[1,"mb-3"],["for","exampleInputUsername1",1,"form-label"],["type","text","id","exampleInputUsername1","autocomplete","Username","placeholder","Username",1,"form-control",3,"required"],["userName",""],["for","exampleInputEmail1",1,"form-label"],["type","email","id","exampleInputEmail1","placeholder","Email",1,"form-control",3,"required"],["userEmail",""],["for","exampleInputPassword1",1,"form-label"],["type","password","id","exampleInputPassword1","autocomplete","current-password","placeholder","Password",1,"form-control",3,"required"],["userPwd",""],[1,"form-check","mb-3"],["type","checkbox","id","authCheck",1,"form-check-input"],["for","authCheck",1,"form-check-label"],["type","submit",1,"btn","btn-primary","me-2","mb-2","mb-md-0",3,"click"],["type","button",1,"btn","btn-outline-primary","btn-icon-text","mb-2","mb-md-0",3,"click"],[1,"mdi","mdi-google","btn-icon-prepend"],["routerLink","/auth/login",1,"d-block","mt-3","text-muted"]],template:function(o,n){if(1&o){const u=e.EpF();e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"div",4),e._UZ(5,"div",5),e.qZA(),e.TgZ(6,"div",6)(7,"div",7)(8,"a",8)(9,"span"),e._uU(10,"Log"),e.qZA(),e._uU(11,"Insight"),e.qZA(),e.TgZ(12,"h5",9),e._uU(13,"Create a free account."),e.qZA(),e.TgZ(14,"form",10)(15,"div",11)(16,"label",12),e._uU(17,"Username"),e.qZA(),e._UZ(18,"input",13,14),e.qZA(),e.TgZ(20,"div",11)(21,"label",15),e._uU(22,"Email address"),e.qZA(),e._UZ(23,"input",16,17),e.qZA(),e.TgZ(25,"div",11)(26,"label",18),e._uU(27,"Password"),e.qZA(),e._UZ(28,"input",19,20),e.qZA(),e.TgZ(30,"div",21),e._UZ(31,"input",22),e.TgZ(32,"label",23),e._uU(33," Remember me "),e.qZA()(),e.TgZ(34,"div")(35,"button",24),e.NdJ("click",function(){e.CHM(u);const s=e.MAs(24),p=e.MAs(29);return e.KtG(n.authService.SignUp(s.value,p.value))}),e._uU(36,"Sign up"),e.qZA(),e.TgZ(37,"button",25),e.NdJ("click",function(){return n.authService.GoogleAuth()}),e._UZ(38,"i",26),e._uU(39," Login with Google "),e.qZA()(),e.TgZ(40,"a",27),e._uU(41,"Already a user? Sign in"),e.qZA()()()()()()()()}2&o&&(e.xp6(5),e.Q6J("ngStyle",e.DdM(1,b)))},dependencies:[a.PC,i.yS],styles:["[_nghost-%COMP%]{height:100vh;display:flex;align-items:center;justify-content:center}"]}),t})()}]}];let Z=(()=>{class t{}return t.\u0275fac=function(o){return new(o||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[a.ez,i.Bz.forChild(f)]}),t})()}}]);