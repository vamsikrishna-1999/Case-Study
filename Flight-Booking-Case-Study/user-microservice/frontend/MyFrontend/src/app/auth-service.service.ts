import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public token:any;
  public bool:any;
  public res1:any;
  public s:string=''
  public users:any;
  constructor(public http:HttpClient) { } 


  registerUser(registerObj:any)
  {
      this.http.post('http://localhost:1000/register',registerObj).subscribe(res=>
      {
        console.log(res);
          this.token=res;
          if(this.token)
          {
            alert("Registration Success"); 
          }
          else if(this.token==0)
          {
            alert("Registration Failed");
          }
          localStorage.setItem('token',this.token.token);
          location.assign("http://localhost:4200/login");
      });
      
  }

  loginUser(loginObj:any)
  {
    this.http.post('http://localhost:1000/login',loginObj).subscribe(res =>
    {
      
        console.log(res);
        this.token=res;
        if(this.token)
          {
            alert("Login success"); 
          }
        console.log(this.token);
        localStorage.setItem('token',this.token.token); 
        location.assign('http://localhost:4300/user');
      
      
      
    });
  }
  logoutUser()
  {
    alert("Logout Success");
    localStorage.removeItem('token')
  }

loggedIn()
{
  return !!localStorage.getItem('token');
}
}
