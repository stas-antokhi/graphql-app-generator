import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Graphql } from 'src/app/shared/models/GraphQLApp';

@Component({
  selector: 'app-graphql-descriptor',
  templateUrl: './graphql-descriptor.component.html',
  styleUrls: ['./graphql-descriptor.component.scss']
})
export class GraphqlDescriptorComponent implements OnInit, OnDestroy {

  @Output() validForm = new EventEmitter<boolean>();

  @Output() descriptor = new EventEmitter<Graphql.Descriptor>();

  descriptorForm!: FormGroup;

  statusSub!: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.descriptorForm = this.fb.group({
      description: [''],
      uri: ['', Validators.required],
      name: ['', Validators.required],
      enabled: [true]
    });

    this.statusSub = this.descriptorForm.statusChanges.subscribe(
      status => {
        this.validForm.emit(status === 'VALID');
        this.descriptor.emit(this.descriptorForm.value as Graphql.Descriptor);
      }
    );

  }

  ngOnDestroy() {
    this.statusSub.unsubscribe();
  }

}
