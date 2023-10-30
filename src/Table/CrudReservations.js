import React from 'react'
import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

//import MaterialTable from 'material-table';




const CrudReservations= () => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5233/api/GetAllReservations")
          .then((data) => data.json())
          .then((data) => setTableData(data))
      }, [])
       console.log(tableData)

    //Con esta func hacemos el delete de una row, tambien volvemos a traer la tabla(esto es de cabeza pero bue)
    const handleDelete = async (id) => {
     
          try { // no ser burro y usar siempre el try y catch en las funciones para error handling
            await axios.delete(`http://localhost:5233/api/DeletePlane/${id}`); // va entre esas comillas sino no agarra id como parametro pasado
            fetch('http://localhost:5233/api/GetAllPlanes')
            .then((data) => data.json())
            .then((data) => setTableData(data));
            setAlert({ type: 'success', message: 'Row deleted successfully.' });
          } 
          catch (error) {
            console.error('Error deleting item:', error);
          }
        }
       

    

    
        /*Add Row - no lo use
    const handleAdd2 = async (plane) => {
        try {
          await axios.post('http://localhost:5233/api/AddPlane', plane)
          // tengo q pasar el array con todos los datos q quiero agregar, va a salir de un form
          

        }
        catch{

        }

      }*/


    //handleSave
    const handleSave = async (row) => {
      try {
        if(row.isNewRow){
          const { plane_id, isNewRow, ...dataWithoutId } = row;
          await axios.post( "http://localhost:5233/api/AddReservation", dataWithoutId); // le saque el id porq al bckend no le cabe, igual deberia hacerlo alla tb esto.
          setAlert({ type: 'success', message: 'Row added successfully.' });
        }else {
          await axios.put("http://localhost:5233/api/UpdateReservation", row); // cambiar 
          setAlert({ type: 'success', message: 'Row edited successfully.' });
        }
        // Si todo sale ok me traigo la tabla denuevo - Medio cabeza...
        fetch('http://localhost:5233/api/GetAllReservations')
          .then((data) => data.json())
          .then((data) => setTableData(data));
      } catch (error) {
        console.error('Error saving item:', error);
      }
    };
    
    //handleAdd
    const handleAdd = () => {
      //const newId = Math.max(...tableData.map((row) => row.plane_id)) + 1;
      const newId = 0;
      const newRow = { ReservationId: newId, plane_id: '', PilotId: '', StartDateTime: '', FinishDateTime: '', TotalTime: '', isNewRow: true }; //con flag en true para saber q es nueva
      setTableData((prevData) => [...prevData, newRow]);
      setAlert({ type: 'info', message: 'New row added. Edit and click Save.' });
    };

    const columns = [
      { field: 'reservationId', headerName: 'RESERVATION ID', width: 150, hide:false }, // no le cabe las variables con la primera y mayus
      { field: 'pilotId', headerName: 'PILOT ID', width: 150, editable:true },
      { field: 'plane_id', headerName: 'PLANE ID', width: 150, editable:true},
      { field: 'startDateTime', headerName: 'RESERVATION START', width: 150, editable:true},
      { field: 'finishDateTime', headerName: 'RESERVATION FINISH', width: 150, editable:true },
      { field: 'totalTimeReservation', headerName: 'TOTAL RESERVATION TIME', width: 150, editable:false },
      { field: 'deleteButton', headerName: 'DELETE', width: 150, 
        renderCell: (params) => (<DeleteIcon onClick={() => handleDelete(params.row.reservationId)}>Delete</DeleteIcon>),
      
      },
      {
        field: 'saveButton',
        headerName: 'SAVE',
        width: 150,
        renderCell: (params) => (
          <SaveIcon onClick={() => handleSave(params.row)}>Save</SaveIcon>
        ),
      },
      
    ];

    const [alert, setAlert] = useState({ type: '', message: '' });

    // Function to close the alert
    const closeAlert = () => {
      setAlert({ type: '', message: '' });
      };

  return (
    <div style={{ height: 700, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <AddIcon />
      <span onClick={handleAdd}>Add</span>
      </div>
      
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.reservationId} //porq sino tengo el campo "id" solo tengo que decirle cual es, en este cado plane_id / NO LE CABE LA PRIMERA EN MAYUS A POSTGRE
        pageSize={12}
      />
      {alert.message && (
      <Alert severity={alert.type} onClose={closeAlert}>
      <AlertTitle>{alert.type === 'success' ? 'Success' : 'Info'}</AlertTitle>
      {alert.message}
      </Alert>
      )}
    </div>
    
    
  )
}

export default CrudReservations;