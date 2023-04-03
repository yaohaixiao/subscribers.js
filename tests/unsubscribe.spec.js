import unsubscribe from 'esm/unsubscribe'
import publish from 'esm/publish'
import subscribe from 'esm/subscribe'
import getSubscribers from '../esm/getSubscribers'
import deleteSubscriber from '../esm/deleteSubscriber'

describe('unsubscribe() 方法', () => {
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

  describe('传递 topic 和 token 两个参数:', () => {
    it(`unsubscribe('author', handlerAuthor)：author 和 handlerAuthor（token 为 Function 类型）都有效`, () => {
      let subscriptions = getSubscribers('author')

      expect(subscriptions.length).toEqual(3)

      unsubscribe('author', handlerAuthor)

      subscriptions = getSubscribers('author')

      expect(subscriptions.length).toEqual(2)

      let result = publish('author', PAYLOAD)

      expect(result).toBe(false)
      expect(author).toEqual('')
      expect(authorCount).toEqual(0)
    })

    it(`unsubscribe('author', '1')：author 和 token（为 String 类型，唯一ID值） 都有效`, () => {
      const token = subscribe('author', handlerAuthor)
      let subscriptions = getSubscribers('author')

      expect(subscriptions.length).toEqual(3)

      unsubscribe('author', token)

      subscriptions = getSubscribers('author')

      expect(subscriptions.length).toEqual(2)

      let result = publish('author', PAYLOAD)

      expect(result).toBe(false)
      expect(author).toEqual('')
      expect(authorCount).toEqual(0)
    })

    it(`unsubscribe('author.career.years', handlerCareer)：author.career.years 有效 handlerCareer 无效`, () => {
      unsubscribe('author.career.years', handlerCareer)

      const subscriptions = getSubscribers('author.career.years')

      expect(subscriptions.length).toEqual(1)

      publish('author.career.years', PAYLOAD)

      expect(years).toEqual(20)
      expect(yearsCount).toEqual(1)
      expect(career).toEqual('programmer')
      expect(careerCount).toEqual(1)
    })

    it(`unsubscribe('ages', handlerCareer)：ages 无效`, () => {
      const result = unsubscribe('ages', handlerCareer)

      expect(result).toBe(false)
    })
  })

  describe('仅传递 topic 一个参数:', () => {
    it(`unsubscribe('ages')：ages 无效`, () => {
      const result = unsubscribe('ages')

      expect(result).toBe(false)
    })

    it(`unsubscribe('author.career')：author.career 有效`, () => {
      unsubscribe('author.career')

      const result = publish('author.career', PAYLOAD)
      const subscribers = getSubscribers()

      expect(result).toBe(false)
      expect(deleteSubscriber('author.career')).toBe(false)
      expect(subscribers.length).toEqual(1)

      publish('author.career.years', PAYLOAD)

      expect(years).toEqual(20)
      expect(yearsCount).toEqual(2)
    })
  })
})
