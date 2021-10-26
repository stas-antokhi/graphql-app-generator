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
    });


    this.schemaForm = this.fb.group({
      // un array di tipi, ogni tipo e' un formGroup
      types: this.fb.array([
        // rappresenta un tipo
        // type Movie {}
        this.fb.group({
          name: ['', Validators.required],
          type: ['type', Validators.required],
          fields: this.fb.array([
            /* rappresenta un field del tipo,
              type Movie {
                comments: [Comments]  <----field
              }
            */
            this.fb.group({
              name: ['', Validators.required],
              returnType: ['String', Validators.required],
              notNull: [false],
              defaultValue: [''],
              // if true -> display a panel to add fields!
              args: [false]
            })
          ])
        })
      ]),
      queries: this.fb.array([])
    });

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
