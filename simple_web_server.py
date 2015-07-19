import sys
from SimpleHTTPServer import SimpleHTTPRequestHandler
import BaseHTTPServer


def serve(HandlerClass=SimpleHTTPRequestHandler,
         ServerClass=BaseHTTPServer.HTTPServer):

    protocol = "HTTP/1.0"
    host = 'localhost'
    port = 8000
    if len(sys.argv) > 1:
        arg = sys.argv[1]
        # is the first argument a web address? (http://...) 
        if ':' in arg:
            host, port = arg.split(':')
            port = int(port)
        else:
            # if it's not, try thinking about it as a port
            try:
                port = int(sys.argv[1])
            except:
                # if you fail (it's not a integer), read it as the host
                host = sys.argv[1]

    # tuples are common in python to describe web adresses
    server_address = (host, port)

    HandlerClass.protocol_version = protocol
    httpd = ServerClass(server_address, HandlerClass)

    sa = httpd.socket.getsockname()
    print "Serving HTTP on", sa[0], "port", sa[1], "..."
    httpd.serve_forever()


if __name__ == "__main__":
    serve()