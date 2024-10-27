const parseRegionId = (id: string): [string, string] => {
  return [id.slice(0, 1), id.slice(1)]
}

export default parseRegionId
