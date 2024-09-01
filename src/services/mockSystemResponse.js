const responses = [
  '你好！我是AI助手，有什么可以帮助你的吗？',
  '这是一个很有趣的问题。让我想想...',
  '根据我的理解，这个问题的答案可能是...',
  '非常抱歉，我可能需要更多信息来回答这个问题。',
  '你的想法很有创意！我们可以进一步探讨一下。',
  '这是一个复杂的话题，涉及多个方面...',
  '我明白你的观点，不过我们也可以从另一个角度来看待这个问题...',
  '谢谢你的提问！这让我学到了新东西。',
  '你说得对，这确实是一个值得深入研究的领域。',
  '有意思！我们来一起分析一下这个情况吧。',
]

export function getMockSystemResponse() {
  const randomIndex = Math.floor(Math.random() * responses.length)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(responses[randomIndex])
    }, 1000 + Math.random() * 2000) // 随机延迟1-3秒
  })
}
