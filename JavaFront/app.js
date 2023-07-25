const URL = "http://localhost:5262/";

let contenedor = document.querySelector("#contenedor");

const getList = async () => {
  try {
    const response = await fetch(`${URL}api/Comment`);
    const datos = await response.json();
    
    let contenido = datos.map((data, index) => `
      <tr>
        <th>${index + 1}</th>
        <th>${data.title}</th>
        <td>${data.description}</td>
        <td>${data.author}</td>
        <td>
          <button class='btn text-warning' onClick="getInfoBook(${data.id})" 
            type="button" data-toggle="modal" data-target="#update"><i class="fa-solid fa-pen-to-square h5"></i></button>
        </td>
        <td>
          <button class='btn text-danger'onClick="getId(${data.id})" type="button" data-toggle="modal" data-target="#delete""
            ><i class="fa-solid fa-eraser h5"></i></button>
        </td>
      </tr>
    `).join('');

    contenedor.innerHTML = contenido;
  } catch (error) {
    let vacio = `<h1 class="text-center">¡Hubo un error al cargar la lista, intentelo más tarde!</h1>`;
    contenedor.innerHTML = vacio;
    console.error("Error:", error);
  }
};


getList();

const createBook = async () => {
  let title = document.querySelector("#title").value;
  let description = document.querySelector("#description").value;
  let author = document.querySelector("#author").value;
  let modal = document.querySelector("#add");
  let formulario = document.querySelector("#formulario");

  if (!title || !description || !author) {
    alert("Debe llenar todos los campos");
    return;
  }

  let data = {
    title,
    description,
    author,
    createdAt: new Date(),
  };

  try {
    let res = await fetch(`${URL}api/Comment/Store`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status == 200) {
      formulario.reset();
      $(modal).modal("hide");
      getList();
      Swal.fire(
        'Se agrego correctamente el nuevo libro!',
        'Da clic para cerrar!',
        'success'
      )
    }
  } catch (error) {
    Swal.fire(
      'Hubo un error al registrar, intentalo más tarde!',
      'Da clic para cerrar!',
      'error'
      )
      console.error("Error:", error);
  }
};


const getBookById = async id => await (await fetch(`${URL}api/Comment/Show?id=${id}`)).json();


const getInfoBook = async id => {
  let { title, description, author, id: bookId } = await getBookById(id);

  document.querySelector('#titleUpdate').value = title;
  document.querySelector('#descriptionUpdate').value = description;
  document.querySelector('#authorUpdate').value = author;
  document.querySelector('#idUpdate').value = bookId;
};


const updateBook = async () => {
  let id = document.querySelector('#idUpdate').value;
  let title = document.querySelector('#titleUpdate').value;
  let description = document.querySelector('#descriptionUpdate').value;
  let author = document.querySelector('#authorUpdate').value;
  let modal = document.querySelector("#update");

  let data = {
    id,
    title,
    description,
    author,
    createdAt: new Date(),
  };

  try {
    let res = await fetch(`${URL}api/Comment/Update?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });

    if (res.status == 200) {
      $(modal).modal("hide");
      getList();
      Swal.fire(
        'Se actualizo correctamente el libro!',
        'Da clic para cerrar!',
        'success'
      )
    }
  } catch (error) {
    Swal.fire(
      'Hubo un error al actualizar, intentalo más tarde!',
      'Da clic para cerrar!',
      'error'
      )
    console.error("Error:", error);
  }
};

const getId = id => {
  document.querySelector("#idBook").value = id;
};

const deleteBook = async () => {
  let modal = document.querySelector("#delete");
  let id = document.querySelector("#idBook").value;

  try {
    let res = await fetch(URL + `api/Comment/Destroy?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status == 200) {
      $(modal).modal("hide");
      getList();
      Swal.fire(
        'Se elimino correctamente el libro!',
        'Da clic para cerrar!',
        'success'
      )
    }
  } catch (error) {
    Swal.fire(
      'Hubo un error al eliminar, intentalo más tarde!',
      'Da clic para cerrar!',
      'error'
      )
    console.error("Error:", error);
  }
}
