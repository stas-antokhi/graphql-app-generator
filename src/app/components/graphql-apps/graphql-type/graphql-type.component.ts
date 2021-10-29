import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { buildClientSchema, buildSchema, GraphQLFieldConfigMap, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString, printSchema, Thunk } from 'graphql';

@Component({
  selector: 'app-graphql-type',
  templateUrl: './graphql-type.component.html',
  styleUrls: ['./graphql-type.component.scss']
})
export class GraphqlTypeComponent implements OnInit {

  typesForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    const fields: Thunk<GraphQLFieldConfigMap<any, any>> = {
      name: {
        type: GraphQLString
      }
    }

    const exampleType = new GraphQLObjectType({
      name: 'Movie',
      fields
    });

    const exampleQuery = new GraphQLObjectType({
      name: "Query",
      fields: {
        // query name
        movies: {
          type: GraphQLString,
          args: {
            id: {
              type: GraphQLInt
            }
          }
        }
      }
    })

    const schema: GraphQLSchema = new GraphQLSchema({
      types: [exampleType],
      query: exampleQuery
    });

    console.log(printSchema(schema));

    this.typesForm = this.fb.group({

    })
  }

}
