import { act } from "react-dom/test-utils"
import { getReadableDate, notifyNewPost, notifyReply, timeSince } from "../components/common/Util"
import { jest } from '@jest/globals'
jest.spyOn(global, "fetch").mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve("success")
  })
);
describe('Utility functions work as expected', () => {

  it('performs dateTime operations', () => {
    expect(getReadableDate().includes(new Date().getFullYear())).toBeTruthy()
  })
  it('performs reply notification update', async () => {
    await act(async () => {
      notifyReply("123")
    })
  })
  it('performs post notification update', async () => {
    await act(async () => {
      notifyNewPost("123")
    })
  })
  it('gets correct time since', async () => {
    const dateNowSpy = jest.spyOn(Date, 'now').mockImplementation(() => 1487076708000);
    expect(timeSince(1487076708000)).toBe("0 seconds")
    expect(timeSince(1487076707000)).toBe("1 second")
    expect(timeSince(1487076706000)).toBe("2 seconds")
    expect(dateNowSpy).toBeCalledTimes(3)
  })
})
