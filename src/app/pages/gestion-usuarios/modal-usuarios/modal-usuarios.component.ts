import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// Utils
import { FormUtils } from 'src/app/utils/form-utils';

// Interface
interface Roles {
  rol: string;
}

@Component({
  selector: 'modal-usuarios',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-usuarios.component.html',
})
export class ModalUsuariosComponent {

  // Validadores
  formUtils = FormUtils;

  @Input() formUsers!: FormGroup;
  @Input() roles!: Roles[];


  @Output() submitForm = new EventEmitter<void>();

  ngOnInit() {
    this.syncDniToUsername();
    this.setupAutoPasswordGeneration();
  }

  syncDniToUsername() {
    this.formUsers.get('dni')?.valueChanges.subscribe((dniValue: string) => {
      this.formUsers.get('username')?.setValue(dniValue, { emitEvent: false });
    });
  }

  setupAutoPasswordGeneration() {
    const nombresControl = this.formUsers.get('firstName');
    const apellidosControl = this.formUsers.get('lastName');

    nombresControl?.valueChanges.subscribe(() => this.generatePasswordFromNames());
    apellidosControl?.valueChanges.subscribe(() => this.generatePasswordFromNames());
  }


  generatePasswordFromNames() {
    const nombres = this.formUsers.get('firstName')?.value?.trim();
    const apellidos = this.formUsers.get('lastName')?.value?.trim();

    if (!nombres || !apellidos) return;

    const nombreParts = nombres.split(' ');
    const apellidoParts = apellidos.split(' ');

    const primeraLetraNombre = nombreParts[0]?.charAt(0)?.toLowerCase() || '';
    const primeraLetraApellido = apellidoParts[0]?.charAt(0)?.toUpperCase() || '';

    const password = `.12345${primeraLetraApellido}${primeraLetraNombre}`;

    this.formUsers.get('password')?.setValue(password);
    // this.formUsers.get('password2')?.setValue(password);
  }

  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }



  onSave() {
    this.submitForm.emit();
  }

}
