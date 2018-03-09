#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
#  sin título.py
#  
#  Copyright 2018 álex bueno <francisco.manuel.alexander@gmail.com>
#  
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#  
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#  
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#  
#  
data = "a"  			#string

words=data.split( " ");
data_i_s="";
for w in words:
    data_b = w.encode('utf-8')	#bytes 
    
    data_i=int.from_bytes(data_b,byteorder='big');
    data_i_s=data_i_s+str(data_i);
print("data_i_s",data_i_s);
print(len(data_i_s)//12);
size_trozo=6;#len(data_i_s)//2;
print ("size_trozo",size_trozo);
count_total=0;
count_in=0;
for i in range (0,len(data_i_s)-size_trozo+1,2*size_trozo):
    trozo_1=data_i_s[i:i+size_trozo];
    trozo_2=data_i_s[i+size_trozo:i+2*size_trozo];
    count_total+=1;
    x=int(trozo_1)*10**(-size_trozo);
    y=int(trozo_2)*10**(-size_trozo);
    
    if (x*x+y*y<=1):
        count_in+=1;

print(data_i_s[(i+2*size_trozo):])
print (count_in,count_total,count_in/count_total*4)
