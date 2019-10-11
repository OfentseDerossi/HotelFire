import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';



export class EmailValidator {
    navCtrl: any;
    static isValid(control: FormControl) { 
        const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/ 
            .test( 
                control.value 
                ); 
                if (re) { 
                    return null; 
                } 
                return { 
                    invalidEmail: true 
                }; 
            }

            
            
    goToSignup():void { 
        this.navCtrl.push('SignupPage'); 
    } 
   
}
