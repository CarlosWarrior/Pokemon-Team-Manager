import { HttpErrorResponse } from "@angular/common/http"
import { ErrorResponse } from "../interfaces/requests"
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar"

function _parseErrorResponse(error: HttpErrorResponse){
    let _error:ErrorResponse | undefined
    try {
        if(typeof error.error == 'string')
        _error = JSON.parse(error.error)
        else if(error instanceof Object)
        _error = error.error
        
    } catch (e) {
        _error = undefined
    }
    return _error
}

export function notifyError(e: HttpErrorResponse, scope: string, snackbar: MatSnackBar, snackbarConfig: MatSnackBarConfig){
    const error: ErrorResponse | undefined = _parseErrorResponse(e)
    snackbar.open(error && error.message || "An error occurred", "Ok", snackbarConfig)
    console.log(scope, {error})
}