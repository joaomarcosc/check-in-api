export interface Coordinate {
  latitude: number
  longitude: number
}

interface GetDistanceBetweenCoordinates {
  from: Coordinate
  to: Coordinate
}

// Return distance between twice locations in kilometers
export function getDistanceBetweenCoordinates({
  from,
  to,
}: GetDistanceBetweenCoordinates) {
  const earthRadiusKm = 6371 // Earth radian in kilometers

  const fromLatRadian = (Math.PI * from.latitude) / 180
  const toLatRadian = (Math.PI * to.latitude) / 180
  const latDiffRadian = (Math.PI * (to.latitude - from.latitude)) / 180
  const lonDiffRadian = (Math.PI * (to.longitude - from.longitude)) / 180

  const a =
    Math.sin(latDiffRadian / 2) * Math.sin(latDiffRadian / 2) +
    Math.cos(fromLatRadian) *
      Math.cos(toLatRadian) *
      Math.sin(lonDiffRadian / 2) *
      Math.sin(lonDiffRadian / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = earthRadiusKm * c

  return distance
}
