package com.inn.headstartdemo.utils.json;

import java.io.IOException;
import java.io.OutputStream;
import java.io.Writer;

import org.apache.commons.io.output.WriterOutputStream;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.ObjectCodec;
import org.codehaus.jackson.impl.Utf8Generator;
import org.codehaus.jackson.io.IOContext;
import org.codehaus.jackson.map.MappingJsonFactory;
/**
 * 
 * @author Autogenerated by Headstart
 * @version 1.0
 *
 */
public class CustomJsonFactory extends MappingJsonFactory {
	public CustomJsonFactory(){
		super();
	}
	
	@Override
	protected JsonGenerator _createJsonGenerator(Writer out, IOContext ctxt)
			throws IOException {		
		return new CustomUTF8Generator(
				ctxt, _generatorFeatures, _objectCodec,
				new WriterOutputStream(out));
	}
	
	@Override
	protected JsonGenerator _createUTF8JsonGenerator(OutputStream out,
			IOContext ctxt) throws IOException {
		// TODO Auto-generated method stub
		return new CustomUTF8Generator(
				ctxt, _generatorFeatures, _objectCodec,
				out);
	}
	
	public final static class CustomUTF8Generator extends Utf8Generator {

		private final static byte[] ONE_BYTE = { '1' };
		private final static byte[] ZERO_BYTE = { '0' };

		public CustomUTF8Generator(IOContext ctxt, int features,
				ObjectCodec codec, OutputStream out) {
			super(ctxt, features, codec, out);
		}

		@Override
		public void writeBoolean(boolean state) throws IOException,
				JsonGenerationException {
			_verifyValueWrite("write boolean value");
			if ((_outputTail + 5) >= _outputEnd) {
				_flushBuffer();
			}
			byte[] keyword = state ? ONE_BYTE : ZERO_BYTE;
			int len = keyword.length;
			System.arraycopy(keyword, 0, _outputBuffer, _outputTail, len);
			_outputTail += len;
		}
	}

}
