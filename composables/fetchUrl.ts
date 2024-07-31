export const useFU = (path) => {
  const nodeEnv = process.env.NODE_ENV  
  return (nodeEnv === 'development' ? 'http://localhost:3000' : 'https://api.nsi.rocks') + path
}
