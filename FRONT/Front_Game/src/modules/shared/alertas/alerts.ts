import Swal from "sweetalert2";

export class Alerts {
    static success(title: string, text: string, buttonText: string): void {
        Swal.fire({
            icon: 'success',
            title,
            html: text,
            confirmButtonText: buttonText,
            heightAuto: false,
        });
    }
    static Error(title: string, text: string, buttonText: string): void {
        Swal.fire({
            icon: 'error',
            title: title,
            text: text,
            confirmButtonText: buttonText,
        })
    }
    static Message(mensaje: string) {
        Swal.fire(mensaje)
    }
    static confirm(titulo: string) {
        return Swal.fire({
            title: titulo,
            showCancelButton: true,
            confirmButtonText: 'Si',
        }).then((result) => {
            if (result.isConfirmed) {
                return true;
            } else if (result.isDenied) {
                return false;
            }
            return null;
        })
    }
}