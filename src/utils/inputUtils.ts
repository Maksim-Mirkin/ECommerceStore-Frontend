export const preventSymbols = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (["e", "E", "+", "-"].includes(evt.key)) {
      evt.preventDefault();
    }
  };