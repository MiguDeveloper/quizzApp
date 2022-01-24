export const errorCode = (code: string): string => {
  const errors: any = {
    'auth/email-already-in-use': 'El correo ya esta registrado',
    'auth/invalid-email': 'El correo es invalido',
    'auth/weak-password': 'el correo debe tener al menos 6 digitos',
    'auth/user-not-found': 'Usuario invalido',
    'auth/wrong-password': 'La contraseñe es invalida',
    default: 'Error default',
  };

  return errors[code] || errors['default'];
};
