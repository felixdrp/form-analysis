const expanse = {
  expand: function(text) {
    let _text = text

    for (let contraction in this.list) {
      // Use regular expresion?
      if (contraction[0] == '^') {
        if (_text.match(contraction)) {
          _text = _text.replace(RegExp(contraction, i), this.list[contraction])
        }
      } else {
        // contraction between spaces.
        if (_text.match(RegExp(` ${contraction} `, 'i'))) {
          _text = _text.replace(RegExp(` ${contraction} `, 'i'), ` ${this.list[contraction]} `)
        }
        // contraction between point and space.
        if (_text.match(RegExp(`.${contraction} `, 'i'))) {
          _text = _text.replace(RegExp(`.{contraction} `, 'i'), `.${this.list[contraction]} `)
        }
      }
    }

    return _text
  },
  list: {
    // dr for doctor
    // '^dr\\s': 'doctor ',
    // 'dr': 'doctor',
    'dr.': 'dr'
  }
}

module.exports = expanse
