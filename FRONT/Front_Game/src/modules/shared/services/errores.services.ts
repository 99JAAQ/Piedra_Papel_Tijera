export class Errores {    
    static obtenerErrores(data: any) {        
        var error: any = "";        
        if (data?.error?.errors != null) {
            for (const [key, value] of Object.entries(data?.error?.errors)) {
                error = value;
                break;
            }
            return error;
        }
        if (data?.status == 401) {
            error = "Sin autorización";            
            return error;
        }
        if (data?.error?.innerException?.message != null) {
            error = data?.error?.innerException?.message;
            return error;
        }
        if (data?.error?.message != null) {
            error = data?.error?.message;
            return error;
        }
        return error;
    }
}