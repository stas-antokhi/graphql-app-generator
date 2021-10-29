import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { GraphQLField, GraphQLFieldConfig, GraphQLFieldConfigMap, GraphQLFieldMap, GraphQLInt, GraphQLObjectType, GraphQLScalarType, GraphQLSchema, GraphQLString, printSchema, Thunk } from 'graphql';

@Component({
  selector: 'app-graphql-app',
  templateUrl: './graphql-app.component.html',
  styleUrls: ['./graphql-app.component.scss']
})
export class GraphqlAppComponent implements OnInit {

  types: GraphQLObjectType[] = [];

  queryFields: Thunk<GraphQLFieldConfigMap<any, any>> = {};

  schemaForm!: FormGroup;

  currentObjectFields: Thunk<GraphQLFieldConfigMap<any, any>> = {};


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    // this.schemaForm = this.fb.group({
    //   types: this.fb.array([]),
    //   query: this.fb.array([])
    // });

    // this.pushField('object', {
    //   comments: {
    //     type: GraphQLString,
    //     args: {
    //       from: {
    //         type: GraphQLString
    //       }
    //     }
    //   }
    // });

    // const obj = this.generateObject('Movie', this.currentObjectFields);

    // this.types.push(obj);

    // this.pushField('query', {
    //   findMovieById: {
    //     type: GraphQLString,
    //     args: {
    //       name: {
    //         type: GraphQLInt
    //       }
    //     }
    //   }
    // });

    // this.pushField('query', {
    //   test: {
    //     type: GraphQLString,
    //     args: {
    //       name: {
    //         type: GraphQLInt
    //       }
    //     }
    //   }
    // });

    // console.log(this.generateSDLSchema());
  }


  pushField(where: 'query' | 'object', field: Thunk<GraphQLFieldConfigMap<any, any>>) {

    if (where === 'object') {
      this.currentObjectFields = Object.assign(this.currentObjectFields, field);
    } else if(where === 'query') {
      this.queryFields = Object.assign(this.queryFields, field);
    }
  }


  get schemaTypes(): FormArray {
    return (this.schemaForm.get('types') as FormArray);
  }


  generateObject(name: string, fields: Thunk<GraphQLFieldConfigMap<any, any>>): GraphQLObjectType {

    this.currentObjectFields = {};

    return new GraphQLObjectType({
      name,
      fields
    });
  }


  // Schema Definition Language
  generateSDLSchema(): string {
    return printSchema(
      new GraphQLSchema({
        types: this.types,
        query: this.generateObject('Query', this.queryFields)
      })
    );
  }


}
