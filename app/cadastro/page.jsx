'use client'
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css'

export default function Cadastro() {
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            nome: "nome aqui",
            escala: "escala aqui",
            turno: "turno aqui"
        }
    });

    async function enviaDados(data) {
        const guarda = await fetch("http://localhost:3004/guardas",
            {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ ...data })
            },
        )
        if (guarda.status == 201) {
            toast.success("Guarda inserido com sucesso")
        } else {
            toast.error("Erro ao inserir o guarda")
        }
    }

    return (
        <div className="container">
            <h1 className="mt-2">Cadastro de Guardas</h1>
            <form onSubmit={handleSubmit(enviaDados)}>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="nome" className="form-label">Nome do Guarda</label>
                        <input type="text" className="form-control" id="nome" {...register("nome")} required />
                    </div>
                    <div className="col-6">
                        <label htmlFor="escala" className="form-label">Escala</label>
                        <input type="text" className="form-control" id="escala" {...register("escala")} required />
                    </div>
                    <div className="col-4">
                        <label htmlFor="turno" className="form-label">Turno</label>
                        <select id="tunor" className="form-select" {...register("turno")} required>
                            <option value="turno_1">Turno 1</option>
                            <option value="turno_2">Turno 2</option>
                            <option value="turno_3">Turno 3</option>
                            <option value="turno_4">Turno 4</option>
                        </select>
                    </div>
                </div>

                <input type="submit" value="Enviar" className="btn btn-primary me-3" />
                <input type="button" value="Limpar" className="btn btn-danger"
                    onClick={() => reset()} />

            </form>
            <ToastContainer
             position="top-center"
             autoClose={5000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
             theme="dark"
             />
        </div>
    )
}