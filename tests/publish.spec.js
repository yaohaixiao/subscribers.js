import publish from 'esm/publish'
import notify from 'esm/notify'
import subscribe from 'esm/subscribe'

describe('publish() 方法', () => {
  let author = ''
  let authorCount = 0
  let career = ''
  let careerCount = 0
  let years = 0
  let yearsCount = 0
  const handlerAuthor = function (data) {
    author = data.author
    authorCount += 1
  }
  const handlerCareer = function (data) {
    career = data.career
    careerCount += 1
  }
  const handlerYears = function (data) {
    years = data.years
    yearsCount += 1
  }
  const PAYLOAD = { author: 'Robert Yao', career: 'programmer', years: 20 }

  subscribe('author', handlerAuthor)
  subscribe('author.career', handlerCareer)
  subscribe('author.career.years', handlerYears)

  it("publish('javascript'), javascript 主题无订阅者：", () => {
    jest.useFakeTimers()

    const result = publish('javascript', PAYLOAD)

    jest.advanceTimersByTime(5)

    expect(result).toBe(false)
  })

  it("publish('author'), author 主题有订阅者：", () => {
    notify('author', PAYLOAD)

    expect(authorCount).toEqual(1)
    expect(author).toEqual('Robert Yao')
  })

  it("publish('author.career'), author 和 author.career 主题有订阅者：", () => {
    jest.useFakeTimers()

    publish('author.career', PAYLOAD)

    jest.advanceTimersByTime(5)

    expect(authorCount).toEqual(2)
    expect(author).toEqual('Robert Yao')
    expect(career).toEqual('programmer')
    expect(careerCount).toEqual(1)

    publish('author.career.years', PAYLOAD)

    jest.advanceTimersByTime(5)

    expect(yearsCount).toEqual(1)
    expect(years).toEqual(20)
    expect(authorCount).toEqual(3)
    expect(author).toEqual('Robert Yao')
    expect(career).toEqual('programmer')
    expect(careerCount).toEqual(2)
  })

  it("publish('author.age'), author 主题有订阅者，age 主题无订阅者：", () => {
    jest.useFakeTimers()

    publish('author.age', PAYLOAD)

    jest.advanceTimersByTime(5)

    expect(authorCount).toEqual(4)
    expect(author).toEqual('Robert Yao')
    expect(career).toEqual('programmer')
    expect(careerCount).toEqual(2)
  })
})
