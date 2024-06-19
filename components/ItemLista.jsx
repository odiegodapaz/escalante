import 'bootstrap-icons/font/bootstrap-icons.css';
import Swal from 'sweetalert2'

export default function ItemLista(props) {
    function confirmaExclusao(id, nome) {
        Swal.fire({
            title: `Confirma a Exclusão do Guarda "${nome}"?`,
            text: "Esta operação não poderá ser desfeita",
            icon: 'question',
            showCancelarButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim. Excluir!'
        }).then((result) => {
            if (result.isConfirmed) {
                props.exclui(id)
                Swal.fire(
                    'Excluído!',
                    'O Guarda foi removido com sucesso.',
                    'success'
                )
            }
        })
    }


    return(
        <tr>
            <td></td>
        </tr>
    )
}