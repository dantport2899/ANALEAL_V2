import React from 'react'
import {NavbarAdmin} from '../componentes/navbarAdmin';
import {PrendaForm} from '../admin/prendaForm';

export const PruebaForms = () => {
  return (
    <div>
        <script>
       <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
      </script>
      <NavbarAdmin/>

        <PrendaForm/>
    </div>
  )
}
