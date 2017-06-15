import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ZadaniaComponent } from './components/zadania/zadania.component';
@NgModule({
imports:      [ BrowserModule ],
declarations: [AppComponent, ZadaniaComponent],
bootstrap: [AppComponent]
})
export class AppModule { }
