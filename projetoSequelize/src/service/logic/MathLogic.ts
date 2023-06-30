
function getOffsetValue (page: number, limit: number): number {
  const response = page * limit
  return response
}

export default
{
  getOffsetValue
}
