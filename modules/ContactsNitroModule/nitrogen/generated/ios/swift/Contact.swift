///
/// Contact.swift
/// This file was generated by nitrogen. DO NOT MODIFY THIS FILE.
/// https://github.com/mrousavy/nitro
/// Copyright © 2025 Marc Rousavy @ Margelo
///

import NitroModules

/**
 * Represents an instance of `Contact`, backed by a C++ struct.
 */
public typealias Contact = margelo.nitro.contacts.Contact

public extension Contact {
  private typealias bridge = margelo.nitro.contacts.bridge.swift

  /**
   * Create a new instance of `Contact`.
   */
  init(firstName: String?, lastName: String?, middleName: String?, phoneNumbers: [StringHolder]?, emailAddresses: [StringHolder]?, imageData: String?, thumbnailImageData: String?) {
    self.init({ () -> bridge.std__optional_std__string_ in
      if let __unwrappedValue = firstName {
        return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
      } else {
        return .init()
      }
    }(), { () -> bridge.std__optional_std__string_ in
      if let __unwrappedValue = lastName {
        return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
      } else {
        return .init()
      }
    }(), { () -> bridge.std__optional_std__string_ in
      if let __unwrappedValue = middleName {
        return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
      } else {
        return .init()
      }
    }(), { () -> bridge.std__optional_std__vector_StringHolder__ in
      if let __unwrappedValue = phoneNumbers {
        return bridge.create_std__optional_std__vector_StringHolder__({ () -> bridge.std__vector_StringHolder_ in
          var __vector = bridge.create_std__vector_StringHolder_(__unwrappedValue.count)
          for __item in __unwrappedValue {
            __vector.push_back(__item)
          }
          return __vector
        }())
      } else {
        return .init()
      }
    }(), { () -> bridge.std__optional_std__vector_StringHolder__ in
      if let __unwrappedValue = emailAddresses {
        return bridge.create_std__optional_std__vector_StringHolder__({ () -> bridge.std__vector_StringHolder_ in
          var __vector = bridge.create_std__vector_StringHolder_(__unwrappedValue.count)
          for __item in __unwrappedValue {
            __vector.push_back(__item)
          }
          return __vector
        }())
      } else {
        return .init()
      }
    }(), { () -> bridge.std__optional_std__string_ in
      if let __unwrappedValue = imageData {
        return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
      } else {
        return .init()
      }
    }(), { () -> bridge.std__optional_std__string_ in
      if let __unwrappedValue = thumbnailImageData {
        return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
      } else {
        return .init()
      }
    }())
  }

  var firstName: String? {
    @inline(__always)
    get {
      return { () -> String? in
        if let __unwrapped = self.__firstName.value {
          return String(__unwrapped)
        } else {
          return nil
        }
      }()
    }
    @inline(__always)
    set {
      self.__firstName = { () -> bridge.std__optional_std__string_ in
        if let __unwrappedValue = newValue {
          return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
        } else {
          return .init()
        }
      }()
    }
  }
  
  var lastName: String? {
    @inline(__always)
    get {
      return { () -> String? in
        if let __unwrapped = self.__lastName.value {
          return String(__unwrapped)
        } else {
          return nil
        }
      }()
    }
    @inline(__always)
    set {
      self.__lastName = { () -> bridge.std__optional_std__string_ in
        if let __unwrappedValue = newValue {
          return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
        } else {
          return .init()
        }
      }()
    }
  }
  
  var middleName: String? {
    @inline(__always)
    get {
      return { () -> String? in
        if let __unwrapped = self.__middleName.value {
          return String(__unwrapped)
        } else {
          return nil
        }
      }()
    }
    @inline(__always)
    set {
      self.__middleName = { () -> bridge.std__optional_std__string_ in
        if let __unwrappedValue = newValue {
          return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
        } else {
          return .init()
        }
      }()
    }
  }
  
  var phoneNumbers: [StringHolder]? {
    @inline(__always)
    get {
      return { () -> [StringHolder]? in
        if let __unwrapped = self.__phoneNumbers.value {
          return __unwrapped.map({ __item in __item })
        } else {
          return nil
        }
      }()
    }
    @inline(__always)
    set {
      self.__phoneNumbers = { () -> bridge.std__optional_std__vector_StringHolder__ in
        if let __unwrappedValue = newValue {
          return bridge.create_std__optional_std__vector_StringHolder__({ () -> bridge.std__vector_StringHolder_ in
            var __vector = bridge.create_std__vector_StringHolder_(__unwrappedValue.count)
            for __item in __unwrappedValue {
              __vector.push_back(__item)
            }
            return __vector
          }())
        } else {
          return .init()
        }
      }()
    }
  }
  
  var emailAddresses: [StringHolder]? {
    @inline(__always)
    get {
      return { () -> [StringHolder]? in
        if let __unwrapped = self.__emailAddresses.value {
          return __unwrapped.map({ __item in __item })
        } else {
          return nil
        }
      }()
    }
    @inline(__always)
    set {
      self.__emailAddresses = { () -> bridge.std__optional_std__vector_StringHolder__ in
        if let __unwrappedValue = newValue {
          return bridge.create_std__optional_std__vector_StringHolder__({ () -> bridge.std__vector_StringHolder_ in
            var __vector = bridge.create_std__vector_StringHolder_(__unwrappedValue.count)
            for __item in __unwrappedValue {
              __vector.push_back(__item)
            }
            return __vector
          }())
        } else {
          return .init()
        }
      }()
    }
  }
  
  var imageData: String? {
    @inline(__always)
    get {
      return { () -> String? in
        if let __unwrapped = self.__imageData.value {
          return String(__unwrapped)
        } else {
          return nil
        }
      }()
    }
    @inline(__always)
    set {
      self.__imageData = { () -> bridge.std__optional_std__string_ in
        if let __unwrappedValue = newValue {
          return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
        } else {
          return .init()
        }
      }()
    }
  }
  
  var thumbnailImageData: String? {
    @inline(__always)
    get {
      return { () -> String? in
        if let __unwrapped = self.__thumbnailImageData.value {
          return String(__unwrapped)
        } else {
          return nil
        }
      }()
    }
    @inline(__always)
    set {
      self.__thumbnailImageData = { () -> bridge.std__optional_std__string_ in
        if let __unwrappedValue = newValue {
          return bridge.create_std__optional_std__string_(std.string(__unwrappedValue))
        } else {
          return .init()
        }
      }()
    }
  }
}