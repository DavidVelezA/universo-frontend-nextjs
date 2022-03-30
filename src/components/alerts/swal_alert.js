import Swal from "sweetalert2";

export const swalAlert = (icon, title, text, refresh) => {
  refresh();
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 1500,
  });
};

export const swalAlertConfirm = (action, refresh) => {
  Swal.fire({
    title: "Eliminar registro",
    text: "Desea eliminar el registro permanentemente",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      const response = await action();
      swalAlert(
        response.data.status,
        response.data.status,
        response.data.message,
        refresh
      );
    }
  });
};
