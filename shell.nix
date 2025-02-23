{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = [
    pkgs.openssl_1_1
  ];
  
  shellHook = ''
    export LD_LIBRARY_PATH=${pkgs.openssl_1_1}/lib:$LD_LIBRARY_PATH
  '';
}
