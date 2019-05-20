class RespAdivce {
  async Around (context, JointPoint, ...values) {
    try {
      const ret = await JointPoint.apply(context, values)
      this.After(values[1], ret)
    } catch (e) {
      this.AfterThrowing(values[1], e)
    }
  }
  After (res, data) {
    if (typeof data === 'object') {
      res.json(data)
    } else if (typeof data === 'string') {
      res.send(data)
    } else {
      res.end()
    }
  }
  AfterThrowing (res, e) {
    console.log(e)
    res.json({ message: e.message, stack: e.stack, code: 1, serverTime: new Date() })
  }
}
module.exports = RespAdivce
