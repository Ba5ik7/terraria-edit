import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileParserService {
    buffer: DataView;
    offset: { _value: number; percentil: number; percentilNext: number; percent: number; value: any; };
    callback: () => void;

  constructor() { }

    async loadFile(file)
    {
        let result = await new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => {
                resolve(reader.result);
            }

            reader.onerror = () => {
                reader.abort();
                console.warn('TerrariaWorldParserError: failed loading the file:');
                throw reader.error;
            }

            reader.readAsArrayBuffer(file);
        });
        console.log('Hello');
        this.buffer = new DataView(result);
        this.callback = () => {}; 
        const _this = this;
        this.offset = {
            _value: 0,
            percentil: file.size / 100,
            percentilNext: 0,
            percent: 0,
            set value(val) {
                this._value = val;
                if (val > this.percentilNext) {
                    this.percentilNext += this.percentil;
                    this.percent += 1;
                    _this.callback(this.percent);
                }
            },
            get value() {
                return this._value;
            },
        };
    }

    readUInt8()
    {
        this.offset.value += 1;
        return this.buffer.getUint8( this.offset.value - 1, true );
    }

    readInt16()
    {
        this.offset.value += 2;
        return this.buffer.getInt16( this.offset.value - 2, true );
    }

    readUInt16()
    {
        this.offset.value += 2;
        return this.buffer.getUint16( this.offset.value - 2, true );
    }

    readInt32()
    {
        this.offset.value += 4;
        return this.buffer.getInt32( this.offset.value - 4, true );
    }

    readUInt32()
    {
        this.offset.value += 4;
        return this.buffer.getUint32( this.offset.value - 4, true );
    }

    readFloat32()
    {
        this.offset.value += 4;
        return this.buffer.getFloat32( this.offset.value - 4, true );
    }

    readFloat64()
    {
        this.offset.value += 8;
        return this.buffer.getFloat64( this.offset.value - 8, true );
    }

    readBoolean()
    {
        return (!!this.readUInt8());
    }

    readBytes(count)
    {
        let data = [];
        for (let i = 0; i < count; i++)
            data[i] = this.readUInt8();

        return new Uint8Array(data);
    }

    readString(length)
    {
        return this.utf8ByteArrayToString( this.readBytes( length ? length : this.readUInt8() ) );
    }

    skipBytes(count)
    {
        this.offset.value += count;
    }

    jumpTo(offset)
    {
        this.offset.value = offset;
    }


    utf8ByteArrayToString() {
      var out = [], pos = 0, c = 0;
        while (pos < bytes.length) {
          var c1 = bytes[pos++];
          if (c1 < 128) {
            out[c++] = String.fromCharCode(c1);
          } else if (c1 > 191 && c1 < 224) {
            var c2 = bytes[pos++];
            out[c++] = String.fromCharCode((c1 & 31) << 6 | c2 & 63);
          } else if (c1 > 239 && c1 < 365) {
            // Surrogate Pair
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            var c4 = bytes[pos++];
            var u = ((c1 & 7) << 18 | (c2 & 63) << 12 | (c3 & 63) << 6 | c4 & 63) -
                0x10000;
            out[c++] = String.fromCharCode(0xD800 + (u >> 10));
            out[c++] = String.fromCharCode(0xDC00 + (u & 1023));
          } else {
            var c2 = bytes[pos++];
            var c3 = bytes[pos++];
            out[c++] =
                String.fromCharCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
          }
        }
        return out.join('');
    }
}
