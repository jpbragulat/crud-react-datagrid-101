import React from 'react'
import { useState, useEffect } from 'react'
import { DataGrid, unstable_gridHeaderFilteringStateSelector } from '@mui/x-data-grid'
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { Select, MenuItem } from '@mui/material';

//import MaterialTable from 'material-table';




const CrudReservations= () => {
    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch("http://localhost:5233/api/GetAllReservations")
          .then((data) => data.json())
          .then((data) => setTableData(data))
      }, [])
       //console.log(tableData)

    //Con esta func hacemos el delete de una row, tambien volvemos a traer la tabla(esto es de cabeza pero bue)
    const handleDelete = async (id) => {
     
          try { // no ser burro y usar siempre el try y catch en las funciones para error handling
            await axios.delete(`http://localhost:5233/api/DeleteReservation/${id}`); // va entre esas comillas sino no agarra id como parametro pasado
            fetch('http://localhost:5233/api/GetAllReservations')
            .then((data) => data.json())
            .then((data) => setTableData(data));
            setAlert({ type: 'success', message: 'Row deleted successfully.' });
          } 
          catch (error) {
            console.error('Error deleting item:', error);
          }
        }
      

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
      const newRow = { reservationId: newId, plane_id: '', pilotId: '', startDateTime: '', finishDateTime: '', totalTime: '', isNewRow: true }; //con flag en true para saber q es nueva
      setTableData((prevData) => [...prevData, newRow]);
      setAlert({ type: 'info', message: 'New row added. Edit and click Save.' });
    };


    //////////////    Seteando DataGrid Fields

    //seteo una var como ejemplo con pilotos:
   var pilots = [];
   fetch("http://localhost:5233/api/GetAllPilots").then((data) => data.json())
    .then((data) => {
      pilots = data;
      //console.log(pilots);
    }); // nos tiro .map is not a function porq estabamos pifiando el tipo de var , era una string y necesitamos qs ea un array para eso usamos .then
   


    // FUNC TRAE ALL PLANES ASYNC
    function fetchDataPlanes() {
      try {
        fetch("http://localhost:5233/api/GetAllPlanes")
        .then((data) => data.json())
        .then((data) => {
          console.log("en el fetch:", data);
          return data;
        })
        
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    }
    
    var planes = fetchDataPlanes();
    //const sleep = ms => new Promise(r => setTimeout(r, ms));
    //async CreateVarPlanes() => { var planes = await fetchDataPlanes();}
    //planes.then((planesData) => { console.log("hola", planesData);});
    //planes.then((planesData) => { planes = planesData});
    //console.log("TESTING:");
    console.log("MostrarFuera:", planes);
    
    
    // end


     
    // HANDLERS
    
    const handlePilotChange = (rowId, newPilotId) => {
        console.log("pilotChange", rowId, newPilotId);
     
      //this.setState({selectValue: event.target.value}, ()=> {alert(`Value: ${this.state.selectValue}`)});
      // Update the 'pilotId' in your state or data array with the newPilotId.
      // You can use the rowId to identify the row to update.
      // Make sure to update the state so that it reflects the new value.
    };

    const handlePlaneChange = (rowId, newPilotId) => {
        console.log("planeChange", rowId, newPilotId);

    };
    // end


    //HARDCODE ARRAY PLANES
    const aviones = [
      { id: 'avionId1', name: 'Plane 1' },
      { id: 'avionId2', name: 'Plane 2' },
      // Add more pilot options as needed
    ];
    
    
    const columns = [
      { field: 'reservationId', headerName: 'RESERVATION ID', width: 150, hide:false }, // no le cabe las variables con la primera y mayus
      { field: 'pilotId', headerName: 'PILOT ID', width: 200, editable:true,
        renderCell: (params) => (
          <Select
            value = {params.row.pilotId}
            onChange={(e) => handlePilotChange(params.row.id, e.target.value)}
            defaultValue=""
            >
                 {pilots.map((pilot) => (<MenuItem key={pilot.pilotId} value={pilot.pilotId}> {pilot.firstName} </MenuItem>))}

          </Select>
        )
      },
      
      { field: 'plane_id', headerName: 'PLANE ID', width: 150, editable:true,
        //renderCell: (params) => (
          //<Select
            //value = {params.row.plane_id}
            //onChange = {(e) => handlePlaneChange(params.row.id, e.target.value)}
            //>
             // {planes.map((plane) => (<MenuItem key={plane.plane_id} value={plane.plane_id}> {plane.identifier} </MenuItem>))}
            
          
          //</Select>

        //)
      
      },
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