import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { EditButtonComponent } from '../components/edit-button/edit-button.component';
import { EditButtonDirective } from '../models/edit-button-directive';

@Directive({
  selector: '[appEditContent]',
})
export class EditContentDirective implements AfterViewInit {
  @Input() appEditContent!: EditButtonDirective;

  private testB: ComponentRef<EditButtonComponent>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private elRef: ElementRef,
    private authService: AuthenticationService
  ) {
    let factory = this.resolver.resolveComponentFactory(EditButtonComponent);
    this.testB = this.viewContainerRef.createComponent(factory);
    this.elRef.nativeElement.appendChild(this.testB.location.nativeElement);
    this.elRef.nativeElement.style.position = 'relative';
  }

  ngAfterViewInit(): void {
    this.testB.instance.editClick = this.appEditContent.editAction;
  }

  @HostListener('mouseenter')
  onMouseOver() {
    this.testB.instance.showButton = this.authService.userIsAdmin();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.testB.instance.showButton = false;
  }
}
