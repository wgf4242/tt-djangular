import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MonthPage } from 'app/_models/month';
import { Person } from 'app/_models/person';
import { AttendService } from 'app/_services/attend.service';
import { MonthService } from 'app/_services/month.service';
import { PersonService } from 'app/_services/person.service';



@Component({
  selector: 'app-add-normal',
  templateUrl: './add-normal.component.html',
})
export class AddNormalComponent implements OnInit {
  isSubmit = false;

  public myForm: FormGroup;
  months: MonthPage;
  monthid: number;
  monthname: string;

  persons: Person[];
  errorMessage: any;

  dropdownList = [];
  selectedItems = [];
  // selectedItems = [[{'id': 3, 'itemName': "朱永刚"}], [{'id': 3, 'itemName': "朱永刚"}]];
  dropdownSettings = {};

  constructor(private _fb: FormBuilder,
              private personService: PersonService,
              private attendService: AttendService,
              private monthService: MonthService,
              private router: Router) {
  }

  ngOnInit() {
    this.myForm = this._fb.group({
      // name: ['', [Validators.required, Validators.minLength(5)]],
      attendFormSet: this._fb.array([])
    });

    this.addForm();

    this.personService.getPersons().subscribe(persons => (
      this.persons = persons,
        persons.forEach(element => {
          this.dropdownList.push({'id': element.id, 'itemName': element.name})
        }),
        console.log(this.dropdownList)
    ))

    this.monthService.getMonths().subscribe(months => {
      // If month all archived add new month , navigate here
      if (months.results[0].archived === 1) {
        this.router.navigate(['attendance/months/add'])
      }

      this.months = months;
      const control = <FormArray>this.myForm.controls['attendFormSet'];
      this.monthid = this.months.results[0].id;
      this.monthname = this.months.results[0].monthname;
      control.controls[0].get('month').setValue(this.monthid);
    });

    this.dropdownSettings = {
      singleSelection: false,
      text: '选择人员',
      selectAllText: '全选',
      unSelectAllText: '全部取消',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.selectedItems);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  onDeSelectAll(items: any) {
    console.log(items);
  }

  initAttendForm(date?: string, person?: number, month?: number) {
    // const today = new Date().toISOString().substring(0, 10);
    return this._fb.group({
      // date: ["2017-12-30", Validators.required],
      date: [date || null, Validators.required],
      attend: [1],
      workhour: [],
      climbhour: [],
      comment: [],
      person: [person || null],
      month: [month || null]
    });
  }

  initAttendFormDay(date?: string) {
    const today = date || new Date().toISOString().substring(0, 10);
    return this._fb.group({
      // date: ["2017-12-30", Validators.required],
      date: [today, Validators.required],
      month: [],
      personArray: [[], Validators.required],
      attendforms: this._fb.array([])
    });
  }


  filterName(id: number) {
    return this.persons.find(obj => obj.id === id).name
  }

  alog(value) {
    console.log(value);
  }

  addForm() {
    // const control = <FormArray>this.myForm.controls['attendforms'];
    // const addrCtrl = this.initAttendForm();

    const control = <FormArray>this.myForm.controls['attendFormSet'];
    const addrCtrl = this.initAttendFormDay();

    addrCtrl.get('month').setValue(this.monthid);

    console.log(addrCtrl.get('date').value);

    console.log(this.myForm);
    if (control.length > 0) {
      const lastdate = control.controls[control.length - 1].get('date').value;
      addrCtrl.get('date').setValue(this.getNextDay(lastdate));
    }


    /* subscribe to individual address value changes */
    addrCtrl.get('date').valueChanges.subscribe(date => {
        const forms = <FormArray>addrCtrl.get('attendforms');
        console.log('dateis', addrCtrl.get('date'), date);
        console.log(date);
        console.log(forms);
        for (const form of forms.controls) {
          form.get('date').setValue(date);
          console.log(form.get('date'));
        }
      }
    );

    addrCtrl.get('personArray').valueChanges.subscribe(persons => {
      console.log('valueChanges', persons);
      const form = <FormArray>addrCtrl.get('attendforms');
      const date = addrCtrl.get('date').value;
      const month = addrCtrl.get('month').value;
      form.controls = [];
      for (const index in persons) {
        if (persons.hasOwnProperty(index)) {
          const element = persons[index];
          const controlForm = this.initAttendForm(date, Number(persons[index]['id']), month);
          console.log('person obj is ', persons[index]);
          console.log('controlform is ', controlForm);
          form.push(controlForm);
        }
      }
    })

    control.push(addrCtrl);

    // clone last selectItem
    if (this.selectedItems.length > 0) {
      const lastPersonArray = JSON.parse(JSON.stringify(this.selectedItems[this.selectedItems.length - 1]));
      this.selectedItems[this.selectedItems.length] = lastPersonArray;
      console.log(`No${this.selectedItems.length} item is `, this.selectedItems[this.selectedItems.length - 1], lastPersonArray);

    }
  }

  getNextDay(lastdate: string) {
    const nextday = new Date(lastdate);
    nextday.setDate(new Date(lastdate + '').getDate() + 1);
    return nextday.toISOString().substring(0, 10);
  }

  removeFormSet(i: number) {
    const control = <FormArray>this.myForm.controls['attendFormSet'];
    control.removeAt(i);
  }

  onSubmit(form) {
    // call API to save
    // ...
    // var objects = form.controls['attendforms'].value;
    // for (let obj of objects) {
    //   this.attendService.create(obj).subscribe(error => this.errorMessage = <any>error);
    // }
    const formSet = form.controls['attendFormSet']
    for (const attendFormDay of formSet.controls) {
      // console.log('formday ', attendFormDay);
      for (const attendforms of attendFormDay.controls['attendforms'].controls) {
        console.log('atformsis ', attendforms.value);
        const object = attendforms.value;
        this.attendService.add(object).subscribe(
          error => {
            this.errorMessage = <any>error;
            this.isSubmit = true;
          }
        );
      }
    }
    // for (const attendform in formSet.controls['attendforms']) {
    // if (formSet.controls['attendforms'].hasOwnProperty(attendform)) {
    // const element = object[attendforms];
    // console.log(attendform);
    // }
    // }
    // let objects = formSet.controls['attendforms'].value;
    // console.log(objects);
    // objects.forEach(obj => {
    //   console.log(obj);
    //   this.attendService
    //     .add(obj)
    //     .subscribe(error => (this.errorMessage = <any>error));
    // });
    // this.attendService.create(objects).subscribe(error => this.errorMessage = <any>error);
  }

  a() {
    console.log(this.errorMessage);

  }

}
