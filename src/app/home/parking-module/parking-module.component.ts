import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IfStmt } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface Vehicle{
  type:string,
  license:string
}
export interface Type{
  value:string
}

@Component({
  
  selector: 'parking-module',
  templateUrl: './parking-module.component.html',
  styleUrls: ['./parking-module.component.scss'],
  encapsulation: ViewEncapsulation.None
 
})
export class ParkingModuleComponent implements OnInit {

  queue:Vehicle[]=[];
  MEDIUM_CAPACITY=5;
  SMALL_CAPACITY=3;
  LARGE_CAPACITY=2;
  small_slots:Vehicle[]=[]
  medium_slots:Vehicle[]=[]
  large_slots:Vehicle[]=[]
  

  constructor(public dialog: MatDialog,private message: MatSnackBar) { 
  }

  ngOnInit(): void {
    this.buildLocalStorage()
  }

  addVehicle(): void {
    const dialogRef = this.dialog.open(AddVehicleDialog, {
      width: '453px',
      hasBackdrop: false,  
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        this.parkVehicle(result);
      }

    });
  }

  parkVehicle(vehicle){

    switch(vehicle.type) { 
      case 'motorbike': {
        if(this.small_slots.length < this.SMALL_CAPACITY){
          this.small_slots.push(vehicle);
          localStorage.setItem('small_spots',JSON.stringify(this.small_slots));
          this.messageParking(vehicle,'small');
        }
        else if(this.medium_slots.length < this.MEDIUM_CAPACITY){
          this.medium_slots.push(vehicle);
          localStorage.setItem('medium_spots',JSON.stringify(this.medium_slots));
          this.messageParking(vehicle,'medium');
        }
        else if(this.large_slots.length < this.LARGE_CAPACITY){
          this.large_slots.push(vehicle);
          localStorage.setItem('large_spots',JSON.stringify(this.large_slots));
          this.messageParking(vehicle,'large');
        }
        else{
          this.queue.push(vehicle)
          localStorage.setItem('queue',JSON.stringify(this.queue));
          this.noParkingAvailable(vehicle);
        }
        break; 
      } 
      case 'sedan': {
        if(this.medium_slots.length < this.MEDIUM_CAPACITY){
          this.medium_slots.push(vehicle);
          localStorage.setItem('medium_spots',JSON.stringify(this.medium_slots));
          this.messageParking(vehicle,'medium');
         
        } 
        else if(this.large_slots.length < this.LARGE_CAPACITY){
          this.large_slots.push(vehicle);
          localStorage.setItem('large_spots',JSON.stringify(this.large_slots));
          this.messageParking(vehicle,'large');
          
        }
        else {
          this.queue.push(vehicle);
          localStorage.setItem('queue',JSON.stringify(this.queue));
          this.noParkingAvailable(vehicle);
        }
        break; 
      }
      case 'truck': { 
        if(this.large_slots.length < this.LARGE_CAPACITY){
          this.large_slots.push(vehicle);
          localStorage.setItem('large_spots',JSON.stringify(this.large_slots));
          this.messageParking(vehicle,'large');
        }
        else {
          this.queue.push(vehicle);
          localStorage.setItem('queue',JSON.stringify(this.queue));
          this.noParkingAvailable(vehicle);
        }
        break; 
      }  
      default: {
        console.log('Invalid vehicle =('); 
        break; 
      } 
   }
  }

  messageParking(vehicle,size){
    this.message.open(vehicle.type+"\xa0"+vehicle.license+"\xa0"+'has been parked in a'+"\xa0"+size+"\xa0"+ 'parking spot','',{
      verticalPosition:'bottom',
      duration: 7000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }
  noParkingAvailable(vehicle){
    this.message.open('No parking spots available,'+"\xa0"+vehicle.type+"\xa0"+vehicle.license+"\xa0"+'was added to the queue','',{
      verticalPosition:'top',
      horizontalPosition:'end',
      duration: 7000,
      panelClass: ['mat-toolbar', 'mat-accent']
    });
  }
  messageVehicleRemoved(vehicle){
    this.message.open(vehicle.type+"\xa0"+vehicle.license+"\xa0"+'has exited the parking lot','',{
      verticalPosition:'bottom',
      duration: 7000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  removeRandomVehicle(){
    let parked_vehicles:Vehicle[]=[...this.small_slots, ...this.medium_slots,...this.large_slots];
    let length=parked_vehicles.length;

    if (length===0){
      this.message.open('There are no parked vehicles in the parking lot','',{
        verticalPosition:'bottom',
        duration: 7000,
        panelClass: ['mat-toolbar', 'mat-warn']
      });
      return;
    }
    
    let chosen_position=this.randomIntFromInterval(0,length-1)
    let chosen_object:Vehicle=parked_vehicles[chosen_position];
    switch(chosen_object.type){
      case 'motorbike':{
        if(this.small_slots.some(a=>a===chosen_object)){
          let changed_array = this.small_slots.filter(a => a !== chosen_object);
          this.messageVehicleRemoved(chosen_object);
          this.small_slots=changed_array;
          localStorage.setItem('small_spots',JSON.stringify(this.small_slots));
          break;
        }
        if(this.medium_slots.some(a=>a===chosen_object)){
          let changed_array = this.medium_slots.filter(a => a !== chosen_object);
          this.messageVehicleRemoved(chosen_object);
          this.medium_slots=changed_array;
          localStorage.setItem('medium_spots',JSON.stringify(this.medium_slots));
          break;
        }
        if(this.large_slots.some(a=>a===chosen_object)){
          let changed_array = this.large_slots.filter(a => a !== chosen_object);
          this.messageVehicleRemoved(chosen_object);
          this.large_slots=changed_array;
          localStorage.setItem('large_spots',JSON.stringify(this.large_slots));
          break;
        }
      }
      case 'sedan':{

        if(this.medium_slots.some(a=>a===chosen_object)){
          let changed_array = this.medium_slots.filter(a => a !== chosen_object);
          this.messageVehicleRemoved(chosen_object);
          this.medium_slots=changed_array;
          localStorage.setItem('medium_spots',JSON.stringify(this.medium_slots));
          break;
        }
        if(this.large_slots.some(a=>a===chosen_object)){
          let changed_array = this.large_slots.filter(a => a !== chosen_object);
          this.messageVehicleRemoved(chosen_object);
          this.large_slots=changed_array;
          localStorage.setItem('large_spots',JSON.stringify(this.large_slots));
          break;
        }
      }
      case 'truck':{

        if(this.large_slots.some(a=>a===chosen_object)){
          let changed_array = this.large_slots.filter(a => a !== chosen_object);
          this.messageVehicleRemoved(chosen_object);
          this.large_slots=changed_array;
          localStorage.setItem('large_spots',JSON.stringify(this.large_slots));
          break;
        }
      }
      default: {
        console.log('Invalid item =('); 
        break; 
      } 
    }
    if(this.queue.length > 0){
      this.parkVehicle(this.queue[0]);
      this.queue.shift();
      localStorage.setItem('queue',JSON.stringify(this.queue));
    }
  }
  randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  buildLocalStorage(){
    if(localStorage.getItem('queue')===null){
      localStorage.setItem('queue',JSON.stringify(this.queue));
    }
    if(localStorage.getItem('small_spots')===null){
    localStorage.setItem('small_spots',JSON.stringify(this.small_slots));
    }
    if(localStorage.getItem('medium_spots')===null){
    localStorage.setItem('medium_spots',JSON.stringify(this.medium_slots));
    }
    if(localStorage.getItem('large_spots')===null){
    localStorage.setItem('large_spots',JSON.stringify(this.large_slots));
    }

    this.small_slots=JSON.parse(localStorage['small_spots']) as Vehicle[];
    this.medium_slots=JSON.parse(localStorage['medium_spots']) as Vehicle[];
    this.large_slots=JSON.parse(localStorage['large_spots']) as Vehicle[];
    this.queue=JSON.parse(localStorage['queue'])as Vehicle[];
    
  }

}

@Component({
  selector: 'add-vehicle-dialog',
  templateUrl: 'add-vehicle-dialog.html',
})
export class AddVehicleDialog {

  types:Type[]=[
    {value:'motorbike'},
    {value:'sedan'},
    {value:'truck'}
  ]

  formVehicle:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddVehicleDialog>, private fb:FormBuilder) {}
  
  ngOnInit(){
    this.buildForm();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  buildForm(){
    this.formVehicle=this.fb.group({
      type:[null, Validators.required],
      license:[null, Validators.required]
    });
  }
  get type(){
    return this.formVehicle.controls.type.value;
  }
  get license(){
    return this.formVehicle.controls.license.value;
  }
  parkVehicle(formValue){
    this.dialogRef.close(formValue);
  }

}