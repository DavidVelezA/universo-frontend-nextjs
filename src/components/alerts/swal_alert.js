import Swal from "sweetalert2";

export const swalAlert = (icon, title, text) => {
    Swal.fire({
        icon: icon,
        title: title,
        text: text,
        showConfirmButton: false,
        timer: 1500,
      });
} 