import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-graphql-app-create',
  templateUrl: './graphql-app-create.component.html',
  styleUrls: ['./graphql-app-create.component.scss']
})
export class GraphqlAppCreateComponent implements OnInit {

  appForm!: FormGroup;

  descriptorForm!: FormGroup;
  schemaForm!: FormGroup;
  mappingsForm!: FormGroup;

  typeForm!: FormGroup;

  fieldForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.descriptorForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      uri: ['', Validators.required],
      enabled: [true]
    });

    //
    this.schemaForm = this.fb.group({
      types: this.fb.array([]),
      queries: this.fb.array([])
    });

    // TYPES TO ADD TO SCHEMA, TYPE | QUERY
    this.typeForm = this.fb.group({
      name: ['', Validators.required],
      type: ['type', Validators.required],
      fields: this.fb.array([])
    })

    // FIELD TO ADD IN TYPES
    this.fieldForm = this.fb.group({
      name: ['', Validators.required],
      returnType: ['String', Validators.required],
      notNull: [false],
      defaultValue: [''],
      // if true -> display a panel to add fields!
      args: [false]
    })
  }

  get schemaTypes(): FormArray {
    return this.schemaForm.controls['types'] as FormArray;
  }


  getType(index: number): FormControl {
    return this.schemaTypes.at(index) as FormControl;
  }

  addField() {
    const fieldControl: FormControl = new FormControl('Hello');
    const types = this.schemaForm.get('types') as FormArray;
    types.push(fieldControl);
    console.log(types);
  }



}
