/**
 * Prevents specific symbols from being entered into an input field.
 * This function blocks the entry of characters 'e', 'E', '+', and '-'.
 * It is typically used to restrict input in numeric fields where these characters are not desired.
 *
 * @param evt The React keyboard event from the input field where this function is applied.
 */
export const preventSymbols = (evt: React.KeyboardEvent<HTMLInputElement>) => {
  if (["e", "E", "+", "-"].includes(evt.key)) {
    evt.preventDefault();
  }
};
