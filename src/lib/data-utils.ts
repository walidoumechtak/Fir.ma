export function getVariationPairs(data: any): string[] {
  if (!data || !data.result || !data.result.sensitivity_results) {
    return []
  }

  const firstInput = Object.values(data.result.sensitivity_results)[0] as Record<string, any>
  const variations = Object.keys(firstInput)

  // Group variations into pairs
  const pairs = variations.reduce((acc, variation) => {
    if (variation.startsWith("-")) {
      const positiveVariation = variation.slice(1)
      if (variations.includes(positiveVariation)) {
        acc.push(`${variation},${positiveVariation}`)
      }
    }
    return acc
  }, [] as string[])

  return pairs
}

export function sortInputsByImpact(data: any, selectedOutput: string, variationPair: string): string[] {
  if (!data || !data.result || !data.result.sensitivity_results) {
    return []
  }

  const [negativeVariation, positiveVariation] = variationPair.split(",")
  const sensitivityResults = data.result.sensitivity_results
  const baseline = data.result.baseline_results[selectedOutput] || 0

  const inputs = Object.keys(sensitivityResults)

  const inputImpacts = inputs.map((input) => {
    const negativeValue = sensitivityResults[input][negativeVariation][selectedOutput]
    const positiveValue = sensitivityResults[input][positiveVariation][selectedOutput]
    const maxImpact = Math.max(Math.abs(negativeValue - baseline), Math.abs(positiveValue - baseline))

    return { input, maxImpact }
  })

  inputImpacts.sort((a, b) => b.maxImpact - a.maxImpact)

  return inputImpacts.map((item) => item.input)
}

