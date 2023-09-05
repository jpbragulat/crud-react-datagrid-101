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




const CrudPilots= () => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5233/api/GetAllPilots")
          .then((data) => data.json())
          .then((data) => setTableData(data))
      }, [])
       console.log(tableData)

    //Con esta func hacemos el delete de una row, tambien volvemos a traer la tabla(esto es de cabeza pero bue)
    const handleDelete = async (id) => {
     
          try { // no ser burro y usar siempre el try y catch en las funciones para error handling
            await axios.delete(`http://localhost:5233/api/DeletePilot/${id}`); // va entre esas comillas sino no agarra id como parametro pasado
            fetch('http://localhost:5233/api/GetAllPilots')
            .then((data) => data.json())
            .then((data) => setTableData(data));
            setAlert({ type: 'success', message: 'Row deleted successfully.' });
          } 
          catch (error) {
            console.error('Error deleting item:', error);
          }
        }
       

    

    //Add Row - no lo use
    const handleAdd2 = async (plane) => {
        try {
          await axios.post('http://localhost:5233/api/AddPlane', plane)
          // tengo q pasar el array con todos los datos q quiero agregar, va a salir de un form
          

        }
        catch{

        }

    }
    ///////////////////// HANDLE SAVE - mofif for Pilots ///////////////////////////

    const handleSave = async (row) => {
      try {
        if(row.isNewRow){
          const { pilotId, isNewRow, ...dataWithoutId } = row; // le saca el campo ID y lo envia para agregar en la DB
          await axios.post( "http://localhost:5233/api/AddPilot", dataWithoutId); // le saque el id porq al bckend no le cabe, igual deberia hacerlo alla tb esto.
          setAlert({ type: 'success', message: 'Row added successfully.' });
        }else {
          await axios.put("http://localhost:5233/api/UpdatePilot", row); 
          setAlert({ type: 'success', message: 'Row edited successfully.' });
        }
        // Si todo sale ok me traigo la tabla denuevo - Medio cabeza...
        fetch('http://localhost:5233/api/GetAllPilots')
          .then((data) => data.json())
          .then((data) => setTableData(data));
      } catch (error) {
        console.error('Error saving item:', error);
      }
    };
    
    /////////////////// HANDLE ADD - modif for Pilots  ///////////////////////////////

    const handleAdd = () => {
      //const newId = Math.max(...tableData.map((row) => row.plane_id)) + 1; // lo sacamos con el pela porq no tenia sentido
      const newId = 0;
      const newRow = { pilotId: newId, firstName: '', lastName: '', flightHours: '', pilotLicenseId: '', isNewRow: true }; //con flag en true para saber q es nueva
      setTableData((prevData) => [...prevData, newRow]);
      setAlert({ type: 'info', message: 'New row added. Edit and click Save.' });
    };


    ////////////////// DEFINICION CAMPOS DEL DATA GRID  //////////////////////////////

    const columns = [
      { field: 'pilotId', headerName: 'ID', width: 150, hide:true },
      { field: 'firstName', headerName: 'FIRST NAME', width: 150, editable:true },
      { field: 'lastName', headerName: 'LAST NAME', width: 150, editable:true},
      { field: 'flightHours', headerName: 'FL HOURS', width: 150, editable:true},
      { field: 'pilotLicenseId', headerName: 'LICENSE', width: 150, editable:true },
      { field: 'deleteButton', headerName: 'DELETE', width: 150, 
        renderCell: (params) => (<DeleteIcon onClick={() => handleDelete(params.row.pilotId)}>Delete</DeleteIcon>),
      
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


    //////////////////////// ALERTAS  /////////////////////////////

    const [alert, setAlert] = useState({ type: '', message: '' });

    // Function to close the alert
    const closeAlert = () => {
      setAlert({ type: '', message: '' });
      };

  //////////////////////// RETURN  //////////////////////////////////    

  return (
    <div style={{ height: 700, width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <AddIcon />
      <span onClick={handleAdd}>Add</span>
      </div>
      
      <DataGrid
        rows={tableData}
        columns={columns}
        getRowId={(row) => row.pilotId} //porq sino tengo el campo "id" solo tengo que decirle cual es, en este cado plane_id
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

export default CrudPilots