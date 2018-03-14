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
        // if (
        //   _text.indexOf('e.g.') > -1 &&
        //   contraction == 'e\\.g\\.'
        // ) {
        //   debugger
        // }
        // contraction between space point and ()
        [' ', '.', '('].forEach( character => {
          let char = character == ' '? ' ': `\\${character}`
          if (_text.match(RegExp(char + contraction + ' ', 'gi'))) {
            _text = _text.replace(RegExp(char + contraction + ' ', 'gi'), `${character}${this.list[contraction]} `)
          }
        })
      }
    }

    return _text
  },
  list: {
    // dr for doctor
    // '^dr\\s': 'doctor ',
    // 'dr': 'doctor',
    'dr.': 'dr',
    // e.g.
    'e\\.g\\.': 'for example',
    // w.r.t.
    'w\\.r\\.t\\.': 'with regards to',
  }
}

module.exports = expanse
