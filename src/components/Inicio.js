import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MaterialTable from "material-table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";

function Inicio() {
  const [date, setDate] = useState(new Date());
  const [medico, setMedico] = useState([]);
  const [espec, setEspec] = useState([]);
  const [idM, setIdM] = useState([]);
  const [idS, setIdS] = useState([]);
  const [datos, setData] = useState([]);
  const [idagenda, setIdAgenda] = useState("");
  const [idUsuario, setIdUsuario] = useState("");
  const [saturacion, setSaturacion] = useState("");
  const [pa, setPa] = useState("");
  const [pulso, setPulso] = useState("");
  const [peso, setPeso] = useState("");
  const [talla, setTalla] = useState("");
  const [temp, setTemp] = useState("");
  const [imc, setImc] = useState("");
  useEffect(() => {
    getDoctors();
    getEspec();
  }, []);
  const columns = [
    {
      title: "HIS.",
      field: "historia",
    },
    {
      title: "TURNO.",
      field: "turno",
    },
    {
      title: "Estado.",
      field: "estado",
    },
    {
      title: "Hora Llegada",
      field: "hora_llegada",
    },
    {
      title: "Usuario",
      field: "usuario",
    },
    {
      title: "Llamadas",
      field: "llamadas",
    },
    {
      title: "Opciones",
    },
  ];

  const format = (fecha) => {
    let formatoFecha =
      fecha.getFullYear() +
      "-" +
      (fecha.getMonth() + 1) +
      "-" +
      fecha.getDate();
    return formatoFecha;
  };

  const getData = async () => {
    const token = sessionStorage.getItem("token");
    const sel1 = document.getElementById("sel1");
    const sel2 = document.getElementById("sel2");
    if (sel1.value !== "0" && sel2.value !== "0") {
      let datos = {
        fecha: format(date),
        id_subservicio: idS,
        id_medico: parseInt(idM),
        id_agenda: "",
      };
      await axios
        .post("/api/V1/enfermeria", datos, {
          headers: { Authorization: "bearer " + token },
        })
        .then((response) => {
          setData(response.data.detalle);
          console.log(response.data);
        });
    }
  };
  const activar = () => {
    const input1 = document.getElementById("inp1")
    const input2 = document.getElementById("inp2")
    const input3  = document.getElementById("inp3")
    const input4  = document.getElementById("inp4")
    const input5 = document.getElementById("inp5")
    const input6 = document.getElementById("inp6")
    const input7 = document.getElementById("inp7")
    input1.disabled = false
    input2.disabled = false
    input3.disabled = false
    input4.disabled = false
    input5.disabled = false
    input6.disabled = false
    input7.disabled = false
  }

  const getDoctors = async () => {
    const token = sessionStorage.getItem("token");
    await axios
      .get("/api/V1/rrhh/medico?medico=portalanza", {
        headers: { Authorization: "bearer " + token },
      })
      .then((response) => {
        setMedico(response.data);
        console.log(response.data);
      });
  };

  const getEspec = async () => {
    const token = sessionStorage.getItem("token");
    await axios
      .get(
        "/api/V1/rrhh/medico/busqueda/buscar-especialidad?busqueda_param=medicina%20general",
        {
          headers: { Authorization: "bearer " + token },
        }
      )
      .then((response) => {
        setEspec(response.data);
        console.log(response.data);
      });
  };
  const save = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");
    const data = {
      agenda: parseInt(idagenda),

      presion: pa,
      saturacion: parseInt(saturacion),
      pulso: parseFloat(pulso),
      peso: parseFloat(peso),
      talla: parseFloat(talla),
      temp: parseFloat(temp),
      imc: parseFloat(imc),
      id_usuario: idUsuario,
    };
    console.log(data)
    await axios.post(
      "/api/V1/enfermeria/signos-vitales", data,
      {
        headers: { Authorization: "bearer " + token },
      }
    ).then(response =>{
        toast.success("Guardado Exitoso")
    });
  };
  return (
    <div>
      <section className="content-md-6">
      <div>
          <Toaster position="top-center" reverseOrder={false}/>
      </div>
        <div className="container-fluid">
          <div className="card card-default">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label className="">Fecha:</label>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label>Médico:</label>
                    <select
                      id="sel1"
                      className="form-control select2"
                      onChange={(e) => {
                        setIdM(e.target.value);
                      }}
                    >
                      <option value="0">Seleccionar Médico...</option>
                      {medico.map((m) => (
                        <option value={m.id_medico}>{m.apellido1}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <label>Especialidad:</label>
                    <select
                      id="sel2"
                      className="form-control select2"
                      onChange={(e) => {
                        setIdS(e.target.value);
                      }}
                      onClick={() => getData()}
                    >
                      <option value="0">Seleccionar Especialidad...</option>
                      {espec.map((e) => (
                        <option value={e.id_subservicio}>
                          {e.descripcion_subservicio}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content-md-6">
        <div className="col-md-6">
          <div className="card card-default">
            <form onSubmit={save}>
              <div className="card-body">
              <div className="form-group">
                <div className="form-control">
                  <label>Saturacion</label>
                  <input disabled id="inp7" onChange={(e)=>setSaturacion(e.target.value)} className="form-control" required type="text" />
                </div>
                <div className="form-control">
                  <label>PA</label>
                  <input disabled id="inp1" onChange={(e)=>setPa(e.target.value)} className="form-control" required type="text" />
                </div>
                <div className="form-control">
                  <label>Pulso</label>
                  <input disabled id="inp2" onChange={(e)=>setPulso(e.target.value)} className="form-control" required type="text" />
                </div>
                <div className="form-control">
                  <label>Peso</label>
                  <input disabled id="inp3" onChange={(e)=>setPeso(e.target.value)} className="form-control" required type="text" />
                </div>
                <div className="form-control">
                  <label>Talla</label>
                  <input disabled id="inp4" onChange={(e)=>setTalla(e.target.value)} className="form-control" required type="text" />
                </div>
                <div className="form-control">
                  <label>Temp</label>
                  <input disabled id="inp5" onChange={(e)=>setTemp(e.target.value)} className="form-control" required type="text" />
                </div>
                <div className="form-control">
                  <label>IMC</label>
                  <input disabled id="inp6" onChange={(e)=>setImc(e.target.value)} className="form-control" required type="text" />
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary" type="submit">Guardar</button>
                </div>
              </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="row-md-6">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <MaterialTable
                  columns={columns}
                  data={datos}
                  title={"Agenda Médica"}
                  onRowClick={(event, rowData) => {
                    if (rowData !== null) {
                      activar()
                      setIdAgenda(rowData.id_agenda);
                      setIdUsuario(rowData.usuario);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Inicio;
