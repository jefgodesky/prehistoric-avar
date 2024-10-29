const parseRegionId = (id: string): [string, string, string?] => {
  return id.length < 4
    ? [id.slice(0, 1), id.slice(1)]
    : [id.slice(0, 1), id.slice(1, 2), id.slice(2)]
}

export default parseRegionId
