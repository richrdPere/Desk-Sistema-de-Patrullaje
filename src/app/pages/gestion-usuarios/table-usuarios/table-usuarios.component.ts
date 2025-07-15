import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-usuarios',
  imports: [],
  templateUrl: './table-usuarios.component.html',
})
export class TableUsuariosComponent {
  @Input() serenos: any[] = [];

  // ===========================================================
  // 1.- Paginación
  // ===========================================================
  currentPage: number = 1;
  itemsPerPage: number = 9;

  // Calculamos cuántas páginas hay
  get totalPages(): number {
    return Math.ceil(this.serenos.length / this.itemsPerPage);
  }

  // Cortamos el array de serenos para mostrar solo los visibles en esta página
  get paginatedSerenos(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.serenos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  prevPage() {
    this.goToPage(this.currentPage - 1);
  }

  toggleEstadoSereno(sereno: any) {
    const nuevoEstado = !sereno.active;

    // this._serenoService.actualizarSereno(sereno.id, { active: nuevoEstado }).subscribe({
    //   next: () => {
    //     sereno.active = nuevoEstado; // actualizamos en la vista
    //     this.toastr.success(`Cuenta ${nuevoEstado ? 'activada' : 'desactivada'}`);
    //   },
    //   error: () => {
    //     this.toastr.error('No se pudo cambiar el estado del sereno');
    //   }
    // });
  }

  desactivarSereno(_t11: any) {
    throw new Error('Method not implemented.');
  }
  eliminarSereno(arg0: any) {
    throw new Error('Method not implemented.');
  }
  editarSereno(_t11: any) {
    throw new Error('Method not implemented.');
  }
  verSereno(_t11: any) {
    throw new Error('Method not implemented.');
  }



}
