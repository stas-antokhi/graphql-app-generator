import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GraphQLScalarType } from 'graphql';

@Component({
  selector: 'app-graphql-field',
  templateUrl: './graphql-field.component.html',
  styleUrls: ['./graphql-field.component.scss']
})
export class GraphqlFieldComponent implements OnInit {

  fieldForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fieldForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

}
